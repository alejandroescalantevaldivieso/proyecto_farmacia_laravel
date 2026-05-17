<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');

        $systemPrompt = "
Eres un asistente de apoyo para farmacéuticos.

REGLAS CLÍNICAS:
- NO eres médico.
- NO diagnosticas.
- NO indicas dosis exactas.
- SOLO sugieres medicamentos OTC.
- Indica cuándo derivar al médico.

FORMATO VISUAL OBLIGATORIO:
- Usa títulos con emojis.
- Usa listas claras.
- No escribas párrafos largos.
- Máximo 5 líneas.
- Lenguaje simple, directo y comercial.

FORMATO EXACTO:

💊 Posibles opciones:
- Opción 1
- Opción 2

⚠️ Advertencias:
- Advertencia breve

➡️ Derivar al médico si:
- Condición clara
";



        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model' => 'llama-3.1-8b-instant',
            'temperature' => 0.3,
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => $message],
            ],
        ]);

        if ($response->failed()) {
            return response()->json([
                'reply' => 'Error al comunicarse con la IA'
            ], 500);
        }

        return response()->json([
            'reply' => $response['choices'][0]['message']['content']
        ]);
    }
}
