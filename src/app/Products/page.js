"use client";
import React, { useState } from 'react';
import { useDraft } from '../hooks/useDraft';

export default function ProductDescription() {
    const [title, setTitle] = useState(() => sessionStorage.getItem('draftTitle') || '');
    const [content, setContent] = useState(() => sessionStorage.getItem('draftContent') || '');
    const [author, setAuthor] = useState(() => sessionStorage.getItem('draftAuthor') || '');
    const [confirmation, setConfirmation] = useState(false);
    const [image, setImage] = useState(() => {
        const imageData = sessionStorage.getItem('draftImage') || localStorage.getItem('draftImage');
        return imageData ? { dataURL: imageData } : null;
    });

    useDraft(title, content, author, image);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataURL = reader.result;
                localStorage.setItem('draftImage', dataURL);
                setImage({ dataURL });
            };
            reader.onerror = (error) => {
                console.error('Läsfel:', error);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Ingen giltig fil vald.');
        }
    };

    const openIndexedDB = async () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('draftDB', 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('drafts')) {
                    db.createObjectStore('drafts', { keyPath: 'id'});
                }
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const db = await openIndexedDB();
        const transaction = db.transaction('drafts', 'readwrite');
        const draftsStore = transaction.objectStore('drafts');

        const draftData = {
            id: Date.now(),
            title,
            content,
            author,
            image: image?.dataURL || null 
        };

        const request = draftsStore.add(draftData);

        request.onsuccess = () => {
            console.log('Draft data saved to IndexedDB');
        };

        request.onerror = (event) => {
            console.error('Failed to save draft data to IndexedDB:', event.target.error);
        };

        sessionStorage.removeItem('draftTitle');
        sessionStorage.removeItem('draftContent');
        sessionStorage.removeItem('draftAuthor');
        sessionStorage.removeItem('draftImage');

        setTitle('');
        setContent('');
        setAuthor('');
        setImage(null);

        setConfirmation(true);
        setTimeout(() => setConfirmation(false), 3000);
    };

    return (
        <div>
            <h1>Skapa ett nytt blogginlägg</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titel:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Innehåll:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Författare:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Lägg till bild:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Skapa inlägg</button>
            </form>
            {confirmation && (
                <div>
                    <p>Blogginlägget har skapats!</p>
                </div>
            )}
        </div>
    );
}
