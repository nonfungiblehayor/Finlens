
const baseUrl = import.meta.env.VITE_BASE_URL
export const useAnalyzeDoc = async(
    file: File,
    onMessage: (msg: { fileId?: string; text?: string }) => void,
    onComplete?: (fullText: string) => void): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
   try {
    const response = await fetch(`${baseUrl}/analyze`, {
        method: "POST",
        body: formData
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n');
    buffer = lines.pop()!;

    for (const line of lines) {
      if (!line.trim()) continue
      const msg = JSON.parse(line);
      onMessage(msg);
      if (msg.text) fullText += msg.text;
    }
  }

  if (onComplete) onComplete(fullText);
   } catch (error) {
    console.error(error)
    throw new Error(error)
   } 
}
export const useAskData = async(file_id: string, question: string) => {
  try {
    const response = await fetch(`${baseUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId: file_id, question: question })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }   
    if(response) {
      const raw = await response.text()
      const data = JSON.parse(raw)
      return data?.answer?.parts[0]?.text
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
export const useVisualizeData = async(file_id: string, prompt: string) => {
  try {
    const response = await fetch(`${baseUrl}/visualize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId: file_id, prompt: prompt })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }   
    if(response) {
      const raw = await response.text()
      const cleaned = raw.replace(/(^```json\s*|\s*```$)/g, '')
      const data = JSON.parse(cleaned)
      return data
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
function sanitizeJsonString(raw) {
  return raw.replace(
    // This regex finds every double-quoted JSON string (including existing escapes):
    /"([^"\\]*(\\.[^"\\]*)*)"/g,
    (fullMatch) => {
      // fullMatch includes the surrounding quotes, e.g. "\"some\ntext\""
      const inner = fullMatch.slice(1, -1); // strip the leading + trailing quote

      // 1) Escape any literal backslash → "\\"  
      // 2) Escape any literal double-quote → '\"'  
      // 3) Escape any literal carriage-return → "\r"  
      // 4) Escape any literal newline  → "\n"  
      // 5) Escape any literal tab      → "\t"
      const escapedInner = inner
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t");

      return `"${escapedInner}"`;
    }
  );
}
export const useAgent = async(file_id: string) => {
  const agentId = "finlensAgent"
  try {
    const response = await fetch(`http://localhost:4111/api/agents/${agentId}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "user", messages: file_id })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }   
    if(response) {
      const raw = await response.text()
      const cleaned = raw.replace(/(^```json\s*|\s*```$)/g, '')
      const dataResult = JSON.parse(cleaned)
      const rawResult = dataResult?.response?.body?.candidates[0]?.content?.parts[0]?.text.replace(/(^```json\s*|\s*```$)/g, '')
      const cleanedData = rawResult?.replace(/\\(?!(["\\/bfnrt]|u[0-9A-Fa-f]{4}))/g, '')
      const data = JSON.parse(cleanedData)
      return data
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

