import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ICrTypProps } from "../../Types/typesForAdminCr";
import { createType } from "../../http/deviceAPI";

const CreateType: FC<ICrTypProps> = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addType = () => {
        createType({name: value}).then(data => { 
            setValue('') 
            onHide()
        })
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити новий тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введіть назву типу"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addType}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;