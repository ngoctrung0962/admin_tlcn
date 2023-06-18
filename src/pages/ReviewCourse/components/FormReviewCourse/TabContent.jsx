import React from "react";
import { Enums } from "../../../../utils/Enums";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function TabContent({ content }) {
  const renderLecture = (lecture) => {
    return (
      <div className="lecture__box" key={lecture?.id}>
        <div className="lecture__head">
          <div className="lecture__name">
            <p className="">Tiêu đề: {lecture?.title}</p>
          </div>
        </div>
        <div className="lecture__body">
          <div className="lecture__info">
            <p className="lecture__summary">Tóm tắt: {lecture?.summary}</p>
            <p
              dangerouslySetInnerHTML={
                lecture?.description
                  ? { __html: "Mô tả: " + lecture?.description }
                  : { __html: "Không có mô tả" }
              }
              className="lecture__description"
            ></p>

            {lecture?.lectureType === Enums.typeLecture.VIDEO && (
              <video src={lecture?.link} controls className="lecture__video" />
            )}
            {lecture?.lectureType === Enums.typeLecture.PRESENTATION &&
              (lecture?.type === Enums.typePresentation.TEXT ? (
                <div className="lecture__content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: "Nội dung: " + lecture?.content,
                    }}
                  ></p>
                </div>
              ) : (
                <div className="lecture__doc">
                  <DocViewer
                    documents={[
                      {
                        uri: lecture?.link,
                      },
                    ]}
                    pluginRenderers={DocViewerRenderers}
                    // config={{
                    //     header: {
                    //         //disableHeader: false,
                    //         disableFileName: true,
                    //         retainURLParams: false,
                    //     },
                    // }}
                    prefetchMethod="GET"
                    requestHeaders={{
                      Origin: "http://localhost:3000",
                      //"My-Custom-Header": "my-custom-value",
                    }}
                    disableFilename={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            {lecture?.lectureType === Enums.typeLecture.QUIZ && (
              <div className="lecture__content">
                <p className="lecture__numtopass">
                  Số câu vượt qua tối thiểu: {lecture?.numToPass}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-2">
      {content?.map((chapter, index) => {
        return (
          <div className="chapter__box" key={index}>
            <div className="chapter__head">
              <h5 className="chapter__name">
                Tên chapter: {" " + chapter.chapterName}
              </h5>
            </div>
            <div className="chapter__body">
              {chapter?.lectures?.map((lecture, indexLecture) => {
                return renderLecture(lecture);
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
