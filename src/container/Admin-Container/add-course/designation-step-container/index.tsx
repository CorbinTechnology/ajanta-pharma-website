import { FC, useState, useEffect, ChangeEvent } from "react";
import "./style.css";
import Checkbox from "@/components/checkbox";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";

interface DesignationStepSectionProps {
  category: string;
}

const DesignationStepSection: FC<DesignationStepSectionProps> = ({ category }) => {
  const [division, setDivision] = useState<string[]>([]);
  const [designation, setDesignation] = useState<string[]>([]);

  const handleDivision = (value: string, isChecked: boolean) => {
    setDivision((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleDesignation = (value: string, isChecked: boolean) => {
    setDesignation((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const publishDesignation = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/dashboard/publishDesignation/C01', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          division: division,
          designation: designation
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish designation');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error:any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <section className="designation-main-section">
      <div className="designation-main-div-section">
        <div className="designation-text-section">
          <p className="designation-text">
            Select Divisions{" "}
            <span className="designation-span">
              *Only applicable for Medical & Marketing*
            </span>
          </p>
        </div>
        <div className="designation-checkbox-section">
        <Checkbox text={"CDC"} onChange={handleDivision} />
          <Checkbox text={"Nuventa"} onChange={handleDivision} />
          <Checkbox text={"Revance"} onChange={handleDivision} />
          <Checkbox text={"Solesta"} onChange={handleDivision} />
          <Checkbox text={"Inovio"} onChange={handleDivision} />
          <Checkbox text={"Anvaxx"} onChange={handleDivision} />
          <Checkbox text={"Illuma"} onChange={handleDivision} />
          <Checkbox text={"Inyx"} onChange={handleDivision} />
          <Checkbox text={"Ansca"} onChange={handleDivision} />
          <Checkbox text={"Zillion"} onChange={handleDivision} />
          <Checkbox text={"Avecea"} onChange={handleDivision} />
          <Checkbox text={"Axys"} onChange={handleDivision} />
          <Checkbox text={"Maxcor"} onChange={handleDivision} />
          <Checkbox text={"Almiron"} onChange={handleDivision} />
          <Checkbox text={"Mexlon"} onChange={handleDivision} />
          <Checkbox text={"Hospicare"} onChange={handleDivision} />
        </div>
      </div>

      <div className="designation-main-div-section">
        <div className="designation-text-section">
          <p className="designation-text">Select Designation</p>
        </div>
        <div className="designation-checkbox-section2">
        <Checkbox text={"Cluster Head- Cardiac"} onChange={handleDesignation} />
          <Checkbox text={"Cluster Head- Ophthal"} onChange={handleDesignation} />
          <Checkbox text={"Cluster Head- Derma"} onChange={handleDesignation} />
          <Checkbox text={"Cluster Head- Pain"} onChange={handleDesignation} />
          <Checkbox text={"Sales Head"} onChange={handleDesignation} />
          <Checkbox text={"Sales Manager"} onChange={handleDesignation} />
          <Checkbox text={"DSM"} onChange={handleDesignation} />
          <Checkbox text={"RSM"} onChange={handleDesignation} />
          <Checkbox text={"DM"} onChange={handleDesignation} />
          <Checkbox text={"SO"} onChange={handleDesignation} />
        </div>
        <div className="designation-btn-section">
          <PreviousButton text={"Previous"} />
          <button onClick={publishDesignation}>Publish</button>
          <NextButton text={"Next"}  />

        </div>
      </div>
    </section>
  );
};

export default DesignationStepSection;
