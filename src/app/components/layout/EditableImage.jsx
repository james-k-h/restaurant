import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error('Error, please try again later');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload Finished',
        error: 'Issue with Uploading',
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="w-full h-full rounded-lg mb-4"
          src={link}
          width={250}
          height={500}
          alt="avatar"
        />
      )}
      {!link && (
        <div className="text-center bg-primary p-4 text-lightBlack rounded-lg mb-1">
          No Image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border rounded-lg p-2 cursor-pointer text-center">
          Edit
        </span>
      </label>
    </>
  );
}
