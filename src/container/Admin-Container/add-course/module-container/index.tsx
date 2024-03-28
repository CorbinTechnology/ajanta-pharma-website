import { FC, useContext, useEffect, useState } from "react";
import "./style.css";
import InputField from "@/components/fields/input-field";
import UploadButton from "@/components/buttons/upload-button";
import DropdownInputField from "@/components/fields/dropdown-input-field";
import { PlusIcon } from "@/components/icons/plus-icon";
import { ModuleContext } from "@/context/course_update/module_context";

import * as XLSX from 'xlsx';

import { BasicContext } from "@/context/course_update/basicInfo_context";


interface ModuleQuizStepSectionProps {}

const ModuleQuizStepSection: FC<ModuleQuizStepSectionProps> = () => {
  const contextValue = useContext(ModuleContext);
  if (!contextValue) {
    return null;
  }
  const basicContextValue = useContext(BasicContext);
  if (!basicContextValue) {
    return null;
  }
  const { formData } = basicContextValue;
  if (!formData) {
    return null; // Or some other loading state if needed
  }

  // Now you can safely destructure formData
  const {

    category,
    trainingType,
    courseCode: basicCourseCode,
    courseName,
  } = formData;
  const {
    modules,
    handleChangeModuleNum,
    handleChangeModuleName,
    handleFileSelect,
    handleAddModule,
    //assessment
    assessment,
    handleAssessmentFileNameChange,
    handleAssessmentTypeChange,
    handleexcelFileSelect,
    //optional assessment
    assessmentOpt,
    handleRadioChange,
    handleoptAssessmentTypeChange,
    handleoptAssessmentFileNameChange,
    handleoptexcelFileSelect,
    handleAddAssessment,
    mergedApi,
  } = contextValue;


  interface ModuleData {
    moduleName: string;
    moduleNo: string;
    files: FileList | null;
  }
  const [moduleName, setModuleName] = useState<string[]>([]);
  const [moduleNo, setModuleNo] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");

  useEffect(() => {
    console.log("Modules data", modules);
  }, [modules]);

  //upload an assessment
  interface AssessmentData {
    assessmentFileName: string;
    assessmentFileType: string;
    excelFile: FileList | null;
  }

  const [assessmentFileName, setassessmentFileName] = useState<string[]>([]);
  const [assessmentFileType, setassessmentFileType] = useState<string[]>([]);
  const [excelFile, setexcelFile] = useState<FileList | null>(null);
  // const [assessment, setAssessment] = useState<AssessmentData[]>([
  //   { assessmentFileName: "", assessmentFileType: "", excelFile: null },
  // ]);

  useEffect(() => {
    console.log("assessmentFileName:", assessmentFileName);
    console.log("assessmentFileType:", assessmentFileType);
    console.log("excelFile:", excelFile);
  }, [assessmentFileName, assessmentFileType, excelFile]);

  useEffect(() => {
    console.log("Assessment data", assessment);
  }, [assessment]);

  //optional assessment api


  const handleexcelFileRead = (selectedFile: FileList | null) => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0]; 
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet);
          console.log('Excel file content:', excelData);
        }
      };
  
      reader.onerror = (event) => {
        console.error('Error reading file:', event.target?.error);
      };
  
      reader.readAsArrayBuffer(file);
    } else {
      console.error('No file selected.');
    }
  };

  const [optexcelFile,setoptexcelFile] = useState<FileList | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");

  


  const [optexcelFile, setoptexcelFile] = useState<FileList | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");


  return (
    <section className="module-main-section">
      <div className="module-div-section1">
        <div className="module-div-section1-div1">
          <p className="module-category-text">Category</p>
          <p className="module-category-type-text">{category}</p>
        </div>

        <div className="module-div-section1-div2">
          <p className="module-category-text">Training</p>
          <p className="module-category-type-text">{trainingType}</p>
        </div>
        <div className="module-div-section1-div3">
          <p className="module-category-text">Course Code & Name</p>
          <p className="module-category-type-text">
            {basicCourseCode} - {courseName}
          </p>
        </div>
      </div>
      <div className="module-div-section2">
        {modules.map((module: any, index: number) => (
          <>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Module Number
                </label>
                <InputField

                  moduleValue={[module.module_no]}
                  onChange={
                    (newModuleNum: string[]) =>
                      handleChangeModuleNum(newModuleNum, index) 

                  }
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField

                  moduleValue={[module.module_name]}
                  onChange={
                    (newModuleName: string[]) =>
                      handleChangeModuleName(newModuleName, index) 

                  }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={(selectedFiles) =>
                    handleFileSelect(selectedFiles, index)
                  }
                  acceptedTypes=".mp4,.ppt,.pdf"
                  formatText={"File Format: mp4, ppt, pdf "}
                />
              </div>
            </div>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Select Assessment Type
                </label>
                <DropdownInputField
                  // value={assessmentFileType[index]}
                  value={assessment?.assessment_type || ""}
                  onValueChange={function (selectedCategory: string): void {
                    handleAssessmentTypeChange(selectedCategory, index);
                  }}
                  option1={"Competency-Based Skills"}
                  option2={"Medical"}
                  option3={"Marketing"}
                  option4={"Personal Development"}
                  option5={"Classroom Training"}
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Assessment Name
                </label>
                <InputField
                  moduleValue={[assessment?.assessment_name]}
                  onChange={(newFileName: string[]) =>

                    handleChangeAssessmentName(newFileName[0], index)
                }

                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Assessment"}
                  onFileSelect={(selectedFile) =>
                    handleexcelFileRead(selectedFile)
                  }
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
            </div>
          </>
        ))}
        <button className="module-sec-add-module-btn" onClick={handleAddModule}>
          <PlusIcon />
          Add Module
        </button>
      </div>
      <div className="module-div-section3">
        {assessmentOpt.map((assessment: any, index: number) => (
          <>
            <div className="module-radio-selction">
              <div className="module-course-assessment">Course Assessment</div>
              <div className="module-radio-btns">
                <input
                  type="radio"
                  className="module-assessment-radio-btn"
                  id={`preAssessment-${index}`}
                  name={`assessmentType-${index}`}
                  value="pre"
                  checked={selectedAssessment[index] === "pre"}
                  onChange={(e) => handleRadioChange(e, index)}
                />
                <label
                  htmlFor={`preAssessment-${index}`}
                  className="module-container-labels"
                >
                  Pre Assessment
                </label>
              </div>
              <div className="module-radio-btns">
                <input
                  type="radio"
                  className="module-assessment-radio-btn"
                  id={`postAssessment-${index}`}
                  name={`assessmentType-${index}`}
                  value="post"
                  checked={selectedAssessment[index] === "post"}
                  onChange={(e) => handleRadioChange(e, index)}
                />
                <label
                  htmlFor={`postAssessment-${index}`}
                  className="module-container-labels"
                >
                  Post Assessment
                </label>
              </div>
            </div>
            <div className="module-input">
              <div className="module-input-number">
                <label htmlFor="" className="module-container-labels">
                  Select Assessment Type
                </label>
                <DropdownInputField
                  value={assessmentOpt[index].assessmentFileType}
                  onValueChange={(selectedCategory: string) => {
                    handleoptAssessmentTypeChange(selectedCategory, index);
                  }}
                  option1={"Option 1"}
                  option2={"Option 2"}
                  option3={"Option 3"}
                  option4={"Option 4"}
                  option5={"Option 5"}
                />
              </div>
              <div className="module-input-name">
                <label htmlFor="" className="module-container-labels">
                  Module Name
                </label>
                <InputField
                  moduleValue={[assessmentOpt[index]?.assessmentFileName]}
                  onChange={(newFileName: string[]) =>
                    handleoptAssessmentFileNameChange(newFileName[0], index)
                  }
                />
              </div>
              <div className="module-input-uplaod-btn">
                <UploadButton
                  upload={"Upload Course Material"}
                  onFileSelect={(selectedFiles) =>
                    handleoptexcelFileSelect(selectedFiles, index)
                  }
                  acceptedTypes=".xls"
                  formatText={"File Format: xls"}
                />
              </div>
            </div>
          </>
        ))}
        <button
          className="module-sec-add-module-btn"
          onClick={handleAddAssessment}
        >
          <PlusIcon />
          Add Assessment
        </button>
      </div>
    </section>
  );
};

export default ModuleQuizStepSection;
