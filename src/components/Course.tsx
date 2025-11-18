interface CourseProps {
    episode_id: number;
    title: string;
}

export default function Course(c: CourseProps) {
    return <li>{c.title}</li>
}