import axios from "axios";
import { useEffect, useState } from "react";
import Course from "./Course";

export default function CourseList() {
    let [onReload, doReload] = useState(false);
    
    const [courses, setCourses] = useState<any[]>([]);
    
    const [loading, setLoading] = useState(true);

    async function fetchCourses() {
        setLoading(true);
        try {
            const { data } = await axios.get("https://swapi.info/api/films", {
                headers: {
                    //Authorization: "Bearer " + "xxx"
                }
            });

            return data;
        } catch (err) {
            console.error("Error fetching:", err);
        }
        setLoading(false);
    }

    useEffect(() => {
         fetchCourses().then((data) =>
             setCourses(data)
         )
     }, []);

    function handleClick() {
        fetchCourses().then(data => setCourses(data));
    }

    return (
        <div>
        <h1 className="text-xl">Course List</h1>
        <ul className="mt-2 mb-2">
            {
                courses.map((c: any) =>
                    <Course key={c.episode_id} episode_id={c.episode_id} title={c.title}></Course>
                )
            }
        </ul>
        <div>
            <button className="border-2 px-3 rounded-2xl" onClick={handleClick}>Reload</button>
        </div>
        </div>
    );
}