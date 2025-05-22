type ChunkCallback = (chunk: string) => void;
type CompleteCallback = (fullText: string) => void;
export const useAnalyzeDoc = async(
    file: File,
    onMessage: (msg: { fileId?: string; text?: string }) => void,
    onComplete?: (fullText: string) => void): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
   try {
    const response = await fetch("https://finlens-ai.onrender.com/analyze", {
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
export const useVisualizeData = async(file_id: string) => {
  try {
    const response = await fetch("https://finlens-ai.onrender.com/visualize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId: file_id })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }    
    if(response) {
      const raw = await response.text()
      const processRaw = raw.replace(/^```json\s*\n?/, '').replace(/\n?```$/, '')
      const data = JSON.parse(processRaw)
      console.log("visualization result", data)
      return data
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
export const useAskData = async(file_id: string, question: string) => {
  try {
    const response = await fetch("https://finlens-ai.onrender.com/ask", {
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
      console.log("question result", data)
      return data?.answer?.parts[0]?.text
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

