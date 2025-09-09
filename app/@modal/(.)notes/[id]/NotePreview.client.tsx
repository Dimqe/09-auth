"use client"

import css from "./NotePreview.module.css"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";


interface NotePreviewClientProps {
    id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const handleClose = () => router.back();

    
    if (isLoading) return <Modal onClose={handleClose}><p>Loading...</p></Modal>;
    if (error) return <Modal onClose={handleClose}><p>Error loading note.</p></Modal>;
    if (!note) return <Modal onClose={handleClose}><p>Note not found.</p></Modal>;
    

    return (
        <Modal onClose={handleClose}>
         
            <div className={css.modalHeader}>
             
                <h2 className={css.title}>{note.title}</h2>
                <button className={css.backBtn} onClick={handleClose}>
                    Back
                </button>
            </div>

            <div className={css.modalBody}>
              
                <p className={css.content}>{note.content}</p>
            </div>

          
            <div className={css.modalFooter}>
              
                <p className={css.tag}>{note.tag}</p>
                <p className={css.date}>{note.createdAt}</p>
            </div>

        </Modal>
    )
}
  
export default NotePreviewClient;