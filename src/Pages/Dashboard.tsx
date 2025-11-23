import '../App.css'
import Button from '../Components/Button'
import PlusIcon from '../icons/Plusicon'
import Shareicon from '../icons/Shareicon'
import Card from '../Components/Card'
import CreateContentModel from '../Components/Createcontentmodel'
import Sidebar from '../Components/Sidebar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../Config';

interface Content {
  id?: string;
  title: string;
  type: 'twitter' | 'youtube';
  link: string;
}

interface ContentResponse {
  contents: Content[];
}

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  const [contentList, setContentList] = useState<Content[]>([
    {
      id: '1',
      title: 'Sample YouTube Video',
      type: 'youtube',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: 'Sample Twitter Post',
      type: 'twitter',
      link: 'https://twitter.com/twitter/status/1456349951234567890',
    },
  ]);

  useEffect(() => {
    // Fetch existing content cards from backend on mount
    async function fetchContent() {
      try {
        const response = await axios.get<ContentResponse>(BACKEND_URL + '/api/v1/content', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setContentList(response.data.contents || []);
      } catch (error) {
        console.error("Error fetching content list:", error);
      }
    }
    fetchContent();

    // Dynamically add Twitter widgets.js script for twitter embed support
    if (!document.getElementById('twitter-wjs')) {
      const script = document.createElement('script');
      script.id = 'twitter-wjs';
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Callback to add new content to the contentList state
  function handleAddContent(newContent: Content) {
    setContentList(prevList => [newContent, ...prevList]);
  }

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">

        {/* Modal */}
        <CreateContentModel 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onAddContent={handleAddContent}
        />

        <div className="flex justify-end gap-4">
          <Button 
            variant="primary" 
            onClick={() => setModalOpen(true)} 
            text="Add content" 
            startIcon={<PlusIcon />} 
          />

          <Button 
            variant="secondary" 
            text="share brain" 
            startIcon={<Shareicon />} 
          />
        </div>

        <div className="flex gap-4 mt-5">
          {contentList.map(content => (
            <Card 
              key={content.id || content.link} 
              title={content.title} 
              type={content.type} 
              link={content.link} 
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
