import { Shareicon } from "../icons/Shareicon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({title, link, type}: CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <Shareicon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <Shareicon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <Shareicon />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && (() => {
                    // Extract video ID with enhanced regex for various URL formats
                    console.log('YouTube link:', link);
                    const ytRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
                    const ytMatch = link ? link.match(ytRegex) : null;
                    const videoId = ytMatch ? ytMatch[1] : null;
                    console.log('Extracted videoId:', videoId);
                    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

                    if (thumbnailUrl) {
                        return (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <img src={thumbnailUrl} alt={title} className="w-full rounded" />
                            </a>
                        );
                    } else {
                        // show Youtubeicon if no thumbnail
                        return (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="block text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                                    <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path>
                                    <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                                </svg>
                            </a>
                        );
                    }
                })()}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
            </div>

        </div>
    </div>
}
export default Card;