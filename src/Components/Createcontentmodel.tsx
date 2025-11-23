import { useRef, useState, useEffect } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../Config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
interface Content {
  id?: string;
  title: string;
  type: 'twitter' | 'youtube';
  link: string;
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onAddContent?: (content: Content) => void;
}

// controlled component
export function CreateContentModal({open, onClose}: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Update preview URL when link or type changes
    useEffect(() => {
        const link = linkRef.current?.value || "";
        if (!link) {
            setPreviewUrl(null);
            return;
        }

        // Basic handling for Youtube and Twitter previews
        if (type === ContentType.Youtube) {
            // Extract video ID from YouTube URL
            const ytMatch = link.match(/[?&]v=([^&]+)/) || link.match(/youtu\.be\/([^?&]+)/);
            if (ytMatch && ytMatch[1]) {
                const videoId = ytMatch[1];
                setPreviewUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
            } else {
                setPreviewUrl(null);
            }
        } else if (type === ContentType.Twitter) {
            // Twitter doesn't provide direct image preview from URL easily.
            // For now, no preview or could possibly set to a placeholder icon.
            setPreviewUrl(null);
        } else {
            setPreviewUrl(null);
        }
    }, [type, linkRef.current?.value]);

    async function addContent() {
        setLoading(true);
        setError(null);
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token = localStorage.getItem("token");
        console.log("Token used for request:", token);

        if (!title || !link) {
            setError("Title and Link are required");
            setLoading(false);
            return;
        }

        if (!token) {
            setError("User is not authenticated. Please signin.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            alert("Content added successfully");
            onAddContent && onAddContent({ 
              id: res.data.id, 
              title, 
              link, 
              type 
            });
            onClose();
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                setError("Permission denied. Please check your credentials or login again.");
            } else {
                setError(err?.response?.data?.message || "Failed to add content");
            }
        } finally {
            setLoading(false);
        }
    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed max-w-md w-full">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input ref={titleRef} placeholder={"Title"} />
                            <Input ref={linkRef} placeholder={"Link"} />
                        </div>
                        {previewUrl && (
                            <div className="flex justify-center mt-2">
                                <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                            </div>
                        )}
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">

                            <Button startIcon={<></>} text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube)
                            }}></Button>
                            <Button startIcon={<></>} text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter)
                            }}></Button>
                        </div>
                    </div>
                    {error && <div className="text-red-600 text-center mb-2">{error}</div>}
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text={loading ? "Submitting..." : "Submit"} loading={loading} />
                    </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>

}
export default CreateContentModal;
