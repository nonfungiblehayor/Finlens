import JSON5 from 'json5';
const baseUrl = import.meta.env.VITE_BASE_URL
const agenturl = import.meta.env.VITE_AGENT_BASE_URL
export const useAnalyzeDoc = async(
    file: File,
    objectives: string,
    fileBase64: string,
    onMessage: (msg: { fileId?: string; text?: string }) => void,
    onComplete?: (fullText: string) => void): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("objectives", objectives)
    formData.append("fileBase64", fileBase64)
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
      const raw = await response.text()
      const error = JSON.parse(raw)
      throw new Error(error?.error);
    }   
    if(response) {
      const raw = await response.text()
      const data = JSON.parse(raw)
      return data?.answer?.parts[0]?.text
    }
  } catch (error) {
    throw new Error(error.message)
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
      const raw = await response.text()
      const error = JSON.parse(raw)
      throw new Error(error?.error);
    }   
    if(response) {
      const raw = await response.text()
      try {
        const cleaned = raw.replace(/(^```json\s*|\s*```$)/g, '')
        const data = JSON.parse(cleaned)
        return data
      } catch (error) {
        return raw
      }
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
export const useAgent = async(file_id: string, objectives: string) => {
  const agentId = "finlensAgent"
  try {
    const response = await fetch(`${agenturl}/api/agents/${agentId}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
        role: "user", 
        messages: `${file_id} ${objectives}`,
       }
      )
    })
    if (!response.ok) {
      const raw = await response.text()
      const error = JSON.parse(raw)
      throw new Error(error?.error);
    }   
    if(response.ok) {
      const raw = await response.text()
      const cleaned = raw.replace(/(^```json\s*|\s*```$)/g, '')
      const dataResult = JSON.parse(cleaned)
      const rawResult = dataResult?.response?.body?.candidates[0]?.content?.parts[0]?.text.replace(/(^```json\s*|\s*```$)/g, '')
      const data = JSON5.parse(rawResult);
      return data
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

