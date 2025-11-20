import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";

export async function POST(request: Request) {
  console.log("Incoming request to OAuth sign-in endpoint");

  const { provider, providerAccountId, user } = await request.json();
  console.log("Request data:", { provider, providerAccountId, user });

  await dbConnect();
  console.log("Database connection established");

  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("MongoDB session started");

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });
    console.log("Validation result:", validatedData);

    if (!validatedData.success) {
      console.error(
        "Validation failed:",
        validatedData.error.flatten().fieldErrors
      );
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });
    console.log("Slugified username:", slugifiedUsername);

    let existingUser = await User.findOne({ email }).session(session);
    console.log("Existing user:", existingUser);

    if (!existingUser) {
      [existingUser] = await User.create(
        [{ name, username: slugifiedUsername, email, image }],
        { session }
      );
      console.log("New user created:", existingUser);
    } else {
      const updatedData: { name?: string; image?: string } = {};

      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session);
        console.log("User updated with data:", updatedData);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);
    console.log("Existing account:", existingAccount);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
      console.log("New account created for user");
    }

    await session.commitTransaction();
    console.log("Transaction committed successfully");

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error occurred during OAuth sign-in:", error);
    await session.abortTransaction();
    console.log("Transaction aborted");
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
    console.log("MongoDB session ended");
  }
}
