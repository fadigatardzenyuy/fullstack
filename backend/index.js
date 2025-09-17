const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require('cors');

require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- SUPABASE CLIENT INITIALIZATION ---
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// --- ROUTES ---
app.post("/api/auth/signup", async (req, res) => {
    const { email, password } = req.body;
    // =================================================================
    // TODO: WE WILL WRITE THIS LOGIC TOGETHER
    // 1. Use supabase.auth.signUp
    // 2. Handle errors and success cases
    // =================================================================
    res.status(501).json({ message: "Signup logic not implemented yet." });
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    // =================================================================
    // TODO: WE WILL WRITE THIS LOGIC TOGETHER
    // 1. Use supabase.auth.signInWithPassword
    // 2. Handle errors and success cases
    // =================================================================
    res.status(501).json({ message: "Login logic not implemented yet." });
});

app.listen(PORT, () => {
    console.log(`[BACKEND] Server is running on http://localhost:${PORT}`);
});