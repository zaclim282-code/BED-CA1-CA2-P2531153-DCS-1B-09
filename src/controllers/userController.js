import { db } from '../db/connection.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';




// GET /users — Retrieve all players
export const getAllUsers = async (req, res) => {
    try {
        const result = await db
            .select({
                userId: users.userid,
                username: users.username,
                coins: users.coins
            })
            .from(users);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};






// GET /users/:id — Retrieve a player by ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const [user] = await db
            .select({
                userId: users.userid,
                username: users.username,
                coins: users.coins
            })
            .from(users)
            .where(eq(users.userid, id));

        if (!user) {
            return res.status(404).json({
                error: "Player not found"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};






// POST /users — Create a new player
export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body

        // Validate username
        if (!username || typeof username !== "string") {
            return res.status(400).json({
                error: "Invalid username"
            });
        }

        // Validate password
        if (!password || typeof password !== "string") {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        const cleanedUsername = username.trim();

        // Reject whitespace-only values
        if (!cleanedUsername || !password.trim()) {
            return res.status(400).json({
                error: "Username and password cannot be empty"
            });
        }

        // Check for duplicate usernames
        const [existingUser] = await db
            .select({ username: users.username })
            .from(users)
            .where(eq(users.username, cleanedUsername));

        if (existingUser) {
            return res.status(409).json({
                error: "Username already taken"
            });
        }

        // Generate a unique short ID
        const newUserId = nanoid(12);

        // Securely hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new player
        const [newUser] = await db
            .insert(users)
            .values({
                userid: newUserId,
                username: cleanedUsername,
                password: hashedPassword
            })
            .returning({
                userId: users.userid,
                username: users.username,
                coins: users.coins
            });

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Error creating user:", error);

        // Handles duplicate usernames rejected by the SQLite UNIQUE constraint
        const errorMessage = String(error?.message ?? "");
        if (
            errorMessage.includes("UNIQUE constraint failed") ||
            errorMessage.includes("SQLITE_CONSTRAINT_UNIQUE")
        ) {
            return res.status(409).json({
                error: "Username already taken"
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }


};






//Patch /users/:id- Update user details

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, currentPassword, newPassword } = req.body;

        // At least one field must be provided
        if (username === undefined && newPassword === undefined) {
            return res.status(400).json({
                error: "Provide a username or new password"
            });
        }

        // Find the player
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.userid, userId));

        if (!existingUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Build an object containing only fields to update
        const updates = {};

        // Update username if provided
        if (username !== undefined) {
            if (typeof username !== "string" || !username.trim()) {
                return res.status(400).json({
                    error: "Invalid username"
                });
            }

            updates.username = username.trim();
        }

        // Update password if provided
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string" || !newPassword.trim()) {
                return res.status(400).json({
                    error: "Invalid new password"
                });
            }

            if (typeof currentPassword !== "string") {
                return res.status(400).json({
                    error: "Current password is required"
                });
            }

            const passwordMatches = await bcrypt.compare(
                currentPassword,
                existingUser.password
            );

            if (!passwordMatches) {
                return res.status(403).json({
                    error: "Incorrect current password"
                });
            }

            updates.password = await bcrypt.hash(newPassword, 10);
        }

        // Update only the supplied fields
        const [updatedUser] = await db
            .update(users)
            .set(updates)
            .where(eq(users.userid, userId))
            .returning({
                userId: users.userid,
                username: users.username,
                coins: users.coins
            });

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error updating user:", error);

        const errorMessage = String(error?.message ?? "");

        if (
            errorMessage.includes("UNIQUE constraint failed") ||
            errorMessage.includes("SQLITE_CONSTRAINT_UNIQUE")
        ) {
            return res.status(409).json({
                error: "Username already taken"
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};





//Delete /users/:id

export const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id
        console.log(req.params);
        const [deletedUser] = await db
            .delete(users)
            .where(eq(users.userid, userId))
            .returning({
                userId: users.userid,
                username: users.username,
                coins: users.coins
            })

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" })
        }
        return res.status(200).json(deletedUser)
    }

    catch (error) {
        console.error("Error deleting user:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }

};