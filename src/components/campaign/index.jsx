import React from 'react';
import Table from './../table';
import Modal from './../modal';
import { fetchUpcomingJSON, fetchLiveJSON, fetchPastJSON} from './../../data/services';
import * as style from './style.css';

class Campaign extends React.Component {
    constructor(){
        super();
        this.headers =['DATE', 'CAMPAIGN', 'VIEW', 'ACTIONS'];
        this.state = {
            upcoming: false,
            live: false,
            past: false,
            tableContent: [],
            showCalender: false,
            modalContent:''
        };
        this.upComingCampaignData=[];
        this.liveCampaignData=[];
        this.pastCampaignData=[];
        this.campaignBtnClickHandler = this.campaignBtnClickHandler.bind(this);
        this.showCalender = this.showCalender.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        fetchUpcomingJSON().then((resp)=>{
            this.upComingCampaignData = resp;
            this.setState({tableContent: this.upComingCampaignData});
        }).catch((err)=>{
            console.log('error occured');
        });

        fetchLiveJSON().then((resp)=>{
            this.liveCampaignData = resp;
        }).catch((err)=>{
            console.log('error occured');
        });

        fetchPastJSON().then((resp)=>{
            this.pastCampaignData = resp;
        }).catch((err)=>{
            console.log('error occured');
        });
    }

    showCalender(item){
        console.log('show calender here');
    }

    showModal(rowData){
        console.log('showModal');
        this.setState({showModal: true, modalContent: rowData});
    }

    closeModal(){
        this.setState({showModal: false});
    }

    campaignBtnClickHandler (event){
        const targetEle = event.target.id;
        let {upcoming,live,past, tableContent} = this.state;
        if(targetEle) {
            upcoming = false;
            live = false;
            past = false;
            if(targetEle === 'upcoming') {
                upcoming = true;
                tableContent = this.upComingCampaignData;
            }else if(targetEle === 'live') {
                live= true;
                tableContent= this.liveCampaignData;
            }else {
                past = true;
                tableContent = this.pastCampaignData;
            }
        }

        this.setState({upcoming,live, past, tableContent});
    }

    render(){
        const {upcoming,live,past, tableContent, showCalender, showModal, modalContent} = this.state;
        return(
            <div  className={style.campaignWrapper}>
                <h1> Manage <span className={style.bold}>Campaign</span></h1>
                <div className={style.btnWrapper}>
                    <button id='upcoming' className={`${style.campaignBtn} ${upcoming && style.active}`} onClick={this.campaignBtnClickHandler}> upcoming campaign</button>
                    <button id='live' className={`${style.campaignBtn} ${live && style.active} `} onClick={this.campaignBtnClickHandler}> live campaign</button>
                    <button id='past' className={`${style.campaignBtn} ${past && style.active}`} onClick={this.campaignBtnClickHandler}> past campaign</button>
                </div>
                <div className={'table-wrapper'}>
                    {tableContent && tableContent.length>0 && <Table
                        tableHeader={this.headers}
                        tableContent={tableContent}
                        showCalender ={this.showCalender}
                        showModal={this.showModal}
                    />}
                </div>
                {showModal && <Modal data={modalContent} onClose={this.closeModal}/>}
            </div>
        )
    }
}

export default Campaign;