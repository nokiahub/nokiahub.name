import { getProjectsData } from '../../lib/post';
import { Projects } from '../components/Projects';

export default function Page() {
  const projects = getProjectsData();
  return <Projects items={projects} />;
}
