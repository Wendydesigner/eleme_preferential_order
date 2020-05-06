import * as React from 'react';
import { App } from './index';
import { message, Button,InputNumber,Card } from 'antd';
import { AccountBookOutlined } from '@ant-design/icons';
import './Page.css';
import {Discount} from './discount';
import {ProductsComponent} from './products';
import {orderSubmit} from '../app';
import {Products,endProducts,deliveryOrder,Product,resultList} from '../server'

const discountHeadCols = [
    {
        name: '满足优惠金额(RMB)',
        type: 'inputprice',
        alias: 'sum'
    },
    {
        name: '优惠金额(RMB)',
        type: 'inputprice',
        alias: 'del'
    }
]
const productHeadCols = [
    {
        name: '商品名称',
        type: 'input',
        alias: 'name'
    },
    {
        name: '商品价格(RMB)',
        type: 'inputprice',
        alias: 'price'
    },
    {
        name: '包装费价格(RMB)',
        type: 'inputprice',
        alias: 'packageFee'
    },
    {
        name: '数量',
        type: 'inputnumber',
        alias: 'num'
    }
]
interface IMainProps{
    app: App; // Reference to our index.tsx class
}
interface IMainState {
    isSubmit: Boolean,
    deliveryFee: number,
    discountGroup: number[][],
    productsGroup: Products[],
    result:resultList
}
export class Page extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps, state: IMainState) {
        super(props);
        this.state = {
            isSubmit: false,
            deliveryFee: 0,
            discountGroup: [[]],
            productsGroup: [{
                name: '',
                price:0,
                packageFee:0,
                num:0
            }],
            result: {
                minprice:0,
                list:[]
            }
        }
    }
    onDeliveryFeeChange(value:number): void {
        this.setState({
            deliveryFee: value
        })
        this.goback();
    }
    validateProduct(productsGroup:Products[]) {
        let isValidate:Boolean = false;
        for (var i = 0; i < productsGroup.length;i++) {
            if (productsGroup[i].name === '') {
                message.info("填写商品名称～")
                isValidate = true
                break
            }
            if (productsGroup[i].num <= 0) {
                message.error("填写正确的商品数量～")
                isValidate = true
                break
            }
        }
        return !isValidate;
    }
    async submit(){
        const {deliveryFee,productsGroup,discountGroup} = this.state;
        const endProducts: endProducts = {};
        if (!this.validateProduct(productsGroup)) {
            return false;
        }
        productsGroup.forEach((product,index)=> {
            const productitem:Products = product;
            const name:string=productitem.name;
            const item:Product=productitem;
            endProducts[name]=item;
        });
        const deliveryOrder:deliveryOrder= {
            products: endProducts,
            discount: discountGroup,
            deliveryFee
        }
        const result:resultList = await orderSubmit(deliveryOrder)
        this.setState({
            result:result,
            isSubmit: true
        })
    }
    goback():void {
        this.setState({
            isSubmit: false
        })
    }
    handleProducts(val:Products[]):void {
        this.setState({
            productsGroup: val
        })
        this.goback();
    }
    handleDiscount(val:number[][]):void {
        this.setState({
            discountGroup: val
        })
        this.goback();
    }
    public render(): JSX.Element {
        let button;
        if (this.state.isSubmit) {
            button = (<div className="goback" onClick={()=>{this.goback()}}>
                <Button block>
                    返回
                </Button>
            </div>)
        } else {
            button = (<div className="submit" onClick={this.submit.bind(this)}>
                <Button type="primary" block>
                    提交
                </Button>
            </div>)
        }
        return (
            <div className="App">
                <div className="page-top">
                    <AccountBookOutlined style={{ fontSize: '16px', color: '#e05b85', padding: '6px' }}/>
                    外卖下单最优组合
                </div>
                <div className="page-form">
                    <Card type="inner" title="商品名称和价格">
                        <ProductsComponent headCols={productHeadCols}
                            handleValue={this.handleProducts.bind(this)}></ProductsComponent>
                    </Card>
                    <Card type="inner" style={{ marginTop: 16 }} title="运费">
                        输入每单的运费: <InputNumber defaultValue={0} 
                            onChange={this.onDeliveryFeeChange.bind(this)}/> RMB
                    </Card>
                    <Card type="inner" style={{ marginTop: 16 }} title="满减优惠">
                        <Discount headCols={discountHeadCols} 
                            handleValue={this.handleDiscount.bind(this)}></Discount>
                    </Card>
                    <div className="deliveryFee"></div>
                    <div className="discount"></div>
                </div>
                <div className="page-button">
                    {button}
                </div>
                {this.state.isSubmit? (
                    <div className="page-result">
                        <Card type="inner" style={{ marginTop: 16 }} title="下单最优组合结果">
                            <div className="result-minprice">最优惠的组合价格： {this.state.result.minprice} RMB</div>
                            ---------
                            <div className="result-list">
                                {this.state.result.list.map((item,index)=> {
                                    return (
                                        <div key={index}>第{index+1}个订单组合:<div>
                                            {JSON.stringify(item)}
                                        </div></div>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>
                ):''}
            </div>
        );
    }
}