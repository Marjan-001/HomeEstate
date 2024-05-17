import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landloard, setLandloard] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = e =>{
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandloard = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandloard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandloard();
  }, [listing.userRef]);

  return (
    <>
      {landloard && (
        <div className="flex flex-col gap-2">
          <p>
            Contact {' '}
            <span className="font-semibold">{landloard.username}
           
            </span>
            {' '}
            for
            {' '}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>

          <textarea 
          onChange={onChange}
          placeholder="Enter your message here.."

          className="border border-indigo-500 p-3 rounded-lg w-full "
          
          value={message}  name="message" id="message" rows='2'>

          </textarea>

          <Link to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}
          className="bg-indigo-500 p-3 uppercase rounded-lg text-center text-white"
          >
          Send message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
