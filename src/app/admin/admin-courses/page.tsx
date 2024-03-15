import AdminCourseList from "@/components/tables/courseListTable";
import AdminCoursesHeroSection from "@/container/Admin-Container/admin-courses-container/admin-courses-hero-section";
import AdminCoursesTableSection from "@/container/Admin-Container/admin-courses-container/admin-courses-table-section";
import { FC } from "react";

interface AdminCourcesProps {}

const AdminCources: FC<AdminCourcesProps> = () => {
  return (
    <main>
      <AdminCoursesHeroSection />
     <AdminCoursesTableSection/>
    </main>
  );
};

export default AdminCources;