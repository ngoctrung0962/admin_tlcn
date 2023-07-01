import React from "react";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import chapterApi from "../../../../api/chapterApi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function ModalAddChapter({
  dataEditChapter,
  hanleExitModal,
  fetchData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: dataEditChapter
      ? {
          id: dataEditChapter?.id,
          chapterName: dataEditChapter?.chapterName,
          offset: dataEditChapter?.offset,
          courseId: dataEditChapter?.courseId,
        }
      : {},
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(dataEditChapter ? true : false);
  const { id } = useParams();

  console.log("isEdit", id);
  const onSubmit = (data) => {
    if (isEdit) {
      handleEdit(data);
    } else {
      hanleAdd(data);
    }
  };

  const handleEdit = async (data) => {
    setLoading(true);
    try {
      const res = await chapterApi.teacherUpdateChapter(data);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Cập nhật thành công",
        });
        fetchData();
        reset();
        hanleExitModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Cập nhật thất bại",
        });
      }
    } catch (error) {}
    setLoading(false);
  };
  const hanleAdd = async (data) => {
    setLoading(true);
    try {
      let dataPOST = {
        courseId: id,
        ...data,
      };
      const res = await chapterApi.teacherAddChapter(dataPOST);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm mới thành công",
        });
        fetchData();
        reset();
        hanleExitModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Thêm mới thất bại",
        });
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Modal
      show="true"
      centered
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {dataEditChapter ? "Chỉnh sửa chapter" : "Thêm mới chapter"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Tên chapter</Form.Label>
            <Form.Control
              type="text"
              {...register("chapterName", { required: true })}
            />
            {errors.chapterName && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thứ tự </Form.Label>
            <Form.Control
              type="number"
              {...register("offset", { required: true, min: 1 })}
            />
            {errors.offset?.type === "required" && (
              <p className="form__error">Vui lòng nhập</p>
            )}
            {errors.offset?.type === "min" && (
              <p className="form__error">Vui lòng nhập số lớn hơn 0</p>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary  btn__footer__modal"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {dataEditChapter ? "Cập nhật" : "Thêm mới"}
          {loading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
