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
// --- middleware 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

        return res.status(401).json({ error: "Unauthorized:No token provided" })
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token)
    if (error) {
        return res.status(401).json({ error: 'Unauthorized:Invalid token' })
    }

    req.user = data.user
    next();


}


// --- ROUTES ---
app.post("/api/auth/signup", async (req, res) => {
    const { email, password } = req.body;
    // =================================================================
    // TODO: WE WILL WRITE THIS LOGIC TOGETHER
    // 1. Use supabase.auth.signUp
    const { data, error } = await supabase.auth.signUp({ email, password });
    // 2. Handle errors and success cases
    if (error) return res.status(400).json({ error: error.message })
    return res.status(201).json({ user: data.user })

});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    // =================================================================
    // TODO: WE WILL WRITE THIS LOGIC TOGETHER
    // 1. Use supabase.auth.signInWithPassword
    const { data, erro } = await supabase.auth.signInWithPassword({ email, password })
    if (erro) return res.status(400).json({ erro: erro.message })
    return res.status(200).json({ session: data.session })
    // 2. Handle errors and success cases
    // =================================================================

});


app.get("/api/todos", authMiddleware, async (req, res) => {
    const { data, erro } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })
    if (erro) return res.status(500).json({ erro: message })
    return res.status(200).json(data)
})

app.post("/api/todos", authMiddleware, async (req, res) => {
    const { task } = req.body
    if (!task) return res.status(400).json({ error: 'Task text required' })
    const { data, error } = await supabase
        .from('todos')
        .insert({ task: task, user_id: req.user.id })
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
})

app.listen(PORT, () => {
    console.log(`[BACKEND] Server is running on http://localhost:${PORT}`);
});