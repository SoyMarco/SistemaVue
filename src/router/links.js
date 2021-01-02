/* const express= require('express');
const router= express.Router();

const pool = require('../../database/database');

router.get('/add', (req, res) => {
    res.render('links/add');
});


router.post('/add', async (req, res) => {
        const { name, email, phone } = req.body;
        const newLink = {
        name,
        email,
        phone,
        //user_id: req.user.id
    };
    await pool.query('INSERT INTO nurse set ?', [newLink]);
   req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
    res.send('received');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM nurse');
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM nurse WHERE ID = ?', [id]);
   req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM nurse WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone} = req.body; 
    const newLink = {
        name,
        email,
        phone
    };
    await pool.query('UPDATE nurse set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports=router; */