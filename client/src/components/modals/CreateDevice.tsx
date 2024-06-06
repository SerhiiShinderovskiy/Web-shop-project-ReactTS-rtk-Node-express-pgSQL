import React, { FC, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { ICrDevProps, IInfos } from "../../Types/typesForAdminCr";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { useAppDispatch, useAppSelector } from "../../store/HooksForRedux/redux";
import { setTypes, setBrands, setSelectedType, setSelectedBrand } from "../../store/DeviceSlice";

const CreateDevice: FC<ICrDevProps> = ({show, onHide}) => {
    const dispatch = useAppDispatch()
    const selectedBrand = useAppSelector((state) => state.deviceReducer.selectedBrand)
    const selectedType = useAppSelector((state) => state.deviceReducer.selectedType)
    const types = useAppSelector((state) => state.deviceReducer.types)
    const brands = useAppSelector((state) => state.deviceReducer.brands)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [file, setFile] = useState<any>(null)
    const [info, setInfo] = useState<IInfos[]>([])

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
    }, [])

    // Функція, за допомогою якої характеристики будуть добавлятися
    function addInfo() {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    } 

    // Функція по видаленю характеристики
    function removeInfo(number: any) {
        setInfo(info.filter(i => i.number !== number))
    } 

    function changeInfo(key: string, value: any, number: any) {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    function selectFile(e: any) {
        setFile(e.target.files[0]);
    }

    // Функція, яка буде відправляти запит на сервер і добавляти новий пристрій
    function addDevice() {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`) 
        formData.append('img', file)
        formData.append('brandId', `${selectedBrand.id}`)
        formData.append('typeId', `${selectedType.id}`)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
        
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
                    Добавити пристрій
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Випадаюче меню */}
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedType.name || "Виберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map((type: any) =>
                                <Dropdown.Item 
                                    onClick={() => dispatch(setSelectedType(type))} 
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedBrand.name || "Виберіть бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map((brand: any) =>
                                <Dropdown.Item 
                                    onClick={() => dispatch(setSelectedBrand(brand))} 
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть назву пристрою"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введіть ціну пристрою"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавити нову властивість
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                {/* Input для title */}
                                <Form.Control 
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введіть назву пристрою"
                                />
                            </Col>
                            <Col md={4}>
                                {/* Input для dexcription */}
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введіть опис пристрою"
                                />
                            </Col>
                            {/* Видалення характеристики */}
                            <Col md={4}>
                                <Button 
                                    onClick={() => removeInfo(i.number)}
                                    variant="outline-danger"
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;