import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [chapter, setChapter] = useState('');
  const [chapterDetails, setChapterDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchChapterDetails = async () => {
    if (!chapter) {
      setError('Please enter a chapter number.');
      return;
    }

    setIsLoading(true);
    setError('');
    setChapterDetails(null);

    try {
      const response = await axios.post('http://localhost:5000/api/chapter', {
        chapter,
      });
      setChapterDetails(response.data);
    } catch (err) {
      setError('Failed to fetch chapter details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="overlay"></div>

      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="app-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Bhagavad Gita Chapter Explainer
        </motion.h1>
        
        <motion.p 
          className="app-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover the divine wisdom of each chapter
        </motion.p>

        <motion.div 
          className="input-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.input
            type="number"
            placeholder="Chapter (1-18)"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="chapter-input"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button 
            onClick={fetchChapterDetails} 
            className="submit-btn" 
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="loading-spinner"
              >
                ⏳
              </motion.span>
            ) : 'Get Chapter Details'}
          </motion.button>
        </motion.div>

        {error && (
          <motion.p 
            className="error-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          {chapterDetails && (
            <motion.div
              className="details-card"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              <motion.h2 
                className="chapter-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Chapter {chapterDetails.chapter_number}: {chapterDetails.name}
              </motion.h2>
              
              <motion.div className="details-content">
                {[
                  { label: "Slug", value: chapterDetails.slug },
                  { label: "Transliterated Name", value: chapterDetails.name_transliterated },
                  { label: "Total Verses Count", value: chapterDetails.verses_count },
                  { label: "Chapter Summary (English)", value: chapterDetails.chapter_summary },
                  { label: "Chapter Summary (Hindi)", value: chapterDetails.chapter_summary_hindi },
                ].map((item, index) => (
                  <motion.p 
                    key={index}
                    className="detail-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <strong>{item.label}:</strong> {item.value}
                  </motion.p>
                ))}
              </motion.div>
              
              <div className="decorative-element">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="rotating-orb"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          className="app-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          Wisdom of the Bhagavad Gita - Eternal Knowledge for Modern Life
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;