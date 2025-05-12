export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/today');
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero della citazione' });
  }
}