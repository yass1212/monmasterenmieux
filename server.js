import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

app.get('/api/etablissements', async (req, res) => {
  try {
    const response = await axios.get('https://monmaster.gouv.fr/api/candidat/mm1/etablissements');
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.use(express.json());

app.post('/api/formations', async (req, res) => {
  try {
    const { page = 0, size = 9 } = req.query;
    const { recherche = '' } = req.body;
    const response = await axios.post('https://monmaster.gouv.fr/api/candidat/mm1/formations', 
      { recherche },
      { params: { size, page } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch formations data' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});