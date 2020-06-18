import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md"

function Cart(props) {
  const [finalCart, setFinalCart] = useState([])
  const [finalCourseCart, setFinalCourseCart] = useState([])

  const [shipTotal, setShipTotal] = useState(0)
  const [shopTotal, setShopTotal] = useState(0)
  const [courseTotal, setCourseTotal] = useState(0)
  const [discount, setDiscount] = useState("")
  const [member, setMember] = useState("")

  async function getData() {
    const request = new Request("http://localhost:3002/membercenter/list", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setMember(data[0])
  }
  

  useEffect(() => {

    getData()
    const finalCart = localStorage.getItem('finalCart')
    const finalCourseCart = localStorage.getItem('finalCourseCart')

    const shipTotal = localStorage.getItem('shipTotal')
    const shopTotal = localStorage.getItem('shopTotal')
    const courseTotal = localStorage.getItem('courseTotal')


    setFinalCart(JSON.parse(finalCart))
    setFinalCourseCart(JSON.parse(finalCourseCart))
    setShipTotal(Number(shipTotal))
    setShopTotal(Number(shopTotal))
    setCourseTotal(Number(courseTotal))

  }, [])



    

  return (
    <>
    <Container>
          {finalCart.length > 0 ? (
            <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">訂單明細</th>
                        <th></th>
                        <th>價格</th>
                        <th></th>
                        <th>數量</th>
                        <th></th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>  
                {finalCart.map(value => ( 
                  <Container className="mb-3">
                      <Row>
                          <Col xs={2}>
                              <Image
                              width={64}
                              height={64}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={10} className="d-flex align-items-center">
                              <p className="w-25">{value.name}</p>
                              <p className="w-25 text-right">${value.price}</p>
                              <p className="w-25 text-right">{value.amount}</p>
                              <p className="w-25 text-right">${value.price * value.amount}</p>
                          </Col>
                      </Row>
                  </Container>
            ))}

                <Row>
                  <Col xs={11} className="d-flex align-items-center justify-content-between m-4">
                    <p><MdLocalShipping className="font-48 mr-1"/>寄送資訊：宅配</p>
                    <p>{member.memberName}</p>
                    <p>{member.phone}</p>
                    <p>{member.shipAddress}</p>
                    <Button className="mt-2 mb-2" size="sm" variant="outline-primary" onClick={() => props.history.push("/cart/comfirm/change")}>變更</Button>
                    <p>運費：${shipTotal}</p>
                  </Col>
                </Row>
           
            <Row className="d-flex">
                <Col xs={5} className="item-content-left m-4 pt-4">
                  <div className="form-group w-25 ml-5">
                      <label htmlFor="example3">折扣碼：</label>
                      <input type="text" id="example3" className="form-control form-control-sm"
                              onChange={(event) => setDiscount(event.target.value)}/>
                  </div>
                </Col>
                <Col xs={6} className="d-flex fd-col text-right p-5">
                    <p className="">商品總金額：${shopTotal}</p>
                    <p className="">{(discount !== "") ? `折扣金額：$` : ""}</p>
                    <p className="">折扣後總金額：${shopTotal}</p>
                </Col>
            </Row>  
            </>
          ) : "" } 

          {finalCourseCart.length > 0 ? (
            <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="w-50">訂單明細</th>
                        <th></th>
                        <th>價格</th>
                        <th></th>
                        <th>數量</th>
                        <th></th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    </Table>  
                {finalCourseCart.map(value => ( 
                  <Container className="mb-3">
                      <Row>
                          <Col xs={2}>
                              <Image
                              width={64}
                              height={64}
                              className="mr-3"
                              src={`/items/${value.img}`}
                              alt={value.img}
                              />
                          </Col>
                          <Col xs={10} className="d-flex align-items-center">
                              <p className="w-25">{value.name}</p>
                              <p className="w-25 text-right">${value.price}</p>
                              <p className="w-25 text-right">{value.amount}</p>
                              <p className="w-25 text-right">${value.price * value.amount}</p>
                          </Col>
                      </Row>
                  </Container>
            ))}
           
            <Row className="d-flex">
                <Col xs={5} className="item-content-left m-4 pt-4">
                  <div className="form-group w-25 ml-5">
                      <label htmlFor="example3">折扣碼：</label>
                      <input type="text" id="example3" className="form-control form-control-sm"
                              onChange={(event) => setDiscount(event.target.value)}/>
                  </div>
                </Col>
                <Col xs={6} className="d-flex fd-col text-right p-5">
                    <p className="">商品總金額：${courseTotal}</p>
                    <p className="">{(discount !== "") ? `折扣金額：$` : ""}</p>
                    <p className="">折扣後總金額：${courseTotal}</p>
                </Col>
            </Row>  
            </>
          ) : "" } 

          <Row className="text-right mr-5">
            <Col>
              <p>訂單總金額：${courseTotal + shopTotal}</p>           
            </Col>
          </Row>

        <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button className="mt-2 mb-2" variant="outline-primary" onClick={() => {
                  localStorage.setItem("shipInfo", JSON.stringify(member))
                  localStorage.setItem("total", courseTotal + shopTotal)
                  props.history.push("/cart/payment")
              }}>確認付款</Button>
        </Row>
    </Container>
    </>
  )
}

export default withRouter(Cart)