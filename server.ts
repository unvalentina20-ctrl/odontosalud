import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Dental Assistant Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Mensaje no válido." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not configured
        return res.json({
          reply: "¡Hola! Soy OdontoBot, tu asistente dental. Para responder preguntas personalizadas en tiempo real, puedes configurar tu API Key de Gemini en los ajustes. Mientras tanto, puedes explorar nuestros servicios, consultar precios estimativos o agendar una cita directamente desde el botón 'Reservar Cita'. ¿Tienes alguna urgencia dental hoy?",
          fallback: true
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Eres "OdontoBot", el asistente virtual inteligente de Clínica OdontoSalud (un centro odontológico moderno, profesional y cálido).
Tu objetivo es responder las dudas de los pacientes de forma clara, empática, profesional y amigable en idioma español.
Información clave de la clínica:
- Horario: Lunes a Viernes de 8:00 a 20:00. Sábados de 9:00 a 14:00. Servicio de urgencias 24/7 con guardia telefónica.
- Servicios: Limpieza y Profilaxis, Ortodoncia e Invisalign, Implantes Dentales, Blanqueamiento LED, Endodoncia, Odontopediatría, Cirugía Maxilofacial, Prótesis y Carillas Estéticas.
- Financiación: 3, 6 y 12 cuotas sin interés con todas las tarjetas de crédito. Descuentos por pago en efectivo/transferencia.
- Recomendaciones: Ante dolor intenso, inflamación o sangrado activo, aconseja aplicar compresa fría externamente, evitar automedicarse en exceso y acudir a la guardia o agendar cita prioritaria.
Instrucciones de respuesta:
- Da respuestas estructuradas, breves (máximo 2-3 párrafos), claras y con viñetas si es necesario.
- Si el usuario pregunta cómo reservar cita, recuérdale que puede presionar el botón "Reservar Cita" en la barra inferior o superior.
- Siempre mantén un tono tranquilizador y profesional. Aclara amablemente que las respuestas son orientativas y no reemplazan la evaluación clínica presencial.`;

      // Build context chat
      const formattedHistory = Array.isArray(history)
        ? history.map((h: { role: string; content: string }) => `${h.role === 'user' ? 'Paciente' : 'OdontoBot'}: ${h.content}`).join("\n")
        : "";

      const prompt = `${formattedHistory}\nPaciente: ${message}\nOdontoBot:`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

      const reply = response.text || "Disculpa, tuve un inconveniente al procesar tu consulta. Por favor intenta de nuevo o agenda una cita con nuestros especialistas.";

      return res.json({ reply, fallback: false });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      return res.json({
        reply: "Hola. Tuve una dificultad temporal de conexión. Sin embargo, nuestro equipo de especialistas está disponible para atenderte. Puedes reservar tu cita o contactarnos telefónicamente para urgencias.",
        fallback: true
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
