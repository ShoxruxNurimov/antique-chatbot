import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';

const app = express();
const port = 5000;

// Hugging Face API ayarları
const HUGGING_FACE_API_KEY = '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'; // Hugging Face API anahtarınızı buraya ekleyin
const MODEL_NAME = 'microsoft/DialoGPT-medium'; // Örnek model (değiştirebilirsiniz)

// Middleware'ler
app.use(cors());
app.use(express.json());

// Dosya yükleme ayarları
const upload = multer({ dest: 'uploads/' });

// Chat endpoint'i
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data[0].generated_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Chatbot hatası' });
  }
});

// Görsel yükleme endpoint'i
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Görsel yüklenemedi' });
  }
  res.json({ message: 'Görsel başarıyla yüklendi', file: req.file });
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const { OpenAI } = require('openai');

// const app = express();
// const port = 5000;

// // OpenAI API ayarları
// const openai = new OpenAI({
//   apiKey: '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', // OpenAI API anahtarınızı buraya ekleyin
// });

// // Middleware'ler
// app.use(cors());
// app.use(express.json());

// // Dosya yükleme ayarları
// const upload = multer({ dest: 'uploads/' });

// // Chat endpoint'i
// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: message }],
//     });

//     res.json({ reply: response.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Chatbot hatası' });
//   }
// });

// // Görsel yükleme endpoint'i
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'Görsel yüklenemedi' });
//   }
//   res.json({ message: 'Görsel başarıyla yüklendi', file: req.file });
// });

// // Sunucuyu başlat
// app.listen(port, () => {
//   console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
// });