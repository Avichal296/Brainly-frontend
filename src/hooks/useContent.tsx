import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";

interface ContentItem {
    id: number;
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

interface ContentResponse {
    content: ContentItem[];
}

export function useContent() {
    const [contents, setContents] = useState<ContentItem[]>([]);

    // Async function to refresh content
    async function refresh() {
        try {
            const response = await axios.get<ContentResponse>(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            });
            setContents(response.data.content);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        }
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { contents, refresh };
}
