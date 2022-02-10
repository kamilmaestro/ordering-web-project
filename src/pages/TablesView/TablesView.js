import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import { SUPPLIER_VIEW_URL, SUPPLIERS_VIEW_URL } from '../../utils/urlProvider';
import {MainViewDrawer} from '../../components/MainView/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from '../../components/MainView/Header';
import { TablesList } from '../../components/TablesView/TablesList';
import { getMembersList, getTablesPage, joinNewTable } from '../../apiServices/tablesApi';
import { AddTableModal } from '../../components/TablesView/AddTableModal';
import { ProposalsList } from '../../components/TablesView/ProposalsList';
import { JoinTableModal } from '../../components/TablesView/JoinTableModal';
import { InvitationPopover } from '../../components/TablesView/InvitationPopover';
import { MembersDrawer } from '../../components/TablesView/MembersDrawer';
import { AddProposalModal } from '../../components/TablesView/AddProposalModal/AddProposalModal';
import { getProposalsPage, createNewProposal, becomePurchaserForSupplier } from '../../apiServices/orderApi';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import '../scrollable.css';
import { AddFAB } from '../../components/AddFAB/AddFAB';
import { OrdersList } from '../../components/TablesView/OrdersList/OrdersList';
import { useHistory } from "react-router-dom";

const PROPOSALS_TAB = '1';
const ORDERS_TAB = '2';

export const TablesView = () => {

  const classes = useStyles();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [members, setMembers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJoinTableModalOpen, setIsJoinTableModalOpen] = useState(false);
  const [isAddProposalModalOpen, setIsAddProposalModalOpen] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isInviatationPopoverOpen, setIsInviatationPopoverOpen] = useState(false);
  const [isMembersDrawerOpen, setIsMembersDrawerOpen] = useState(false);
  const [tab, setTab] = useState(PROPOSALS_TAB);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    getTables();
  }, [])

  useEffect(() => {
    getTableMembers(currentTable);
  }, [currentTable])

  useEffect(() => {
    if (currentTable) {
      getProposals(currentTable);
    }
  }, [currentTable])

  const getTables = () => {
    getTablesPage()
      .then((response) => {
        setTables(response.data.content);
        if (response.data.content.length >= 1) {
          setCurrentTable(response.data.content[0].id);
        }
      }).catch(error => {
        console.log(error)
      });
  }

  const getTableMembers = (tableId) => {
    if (tableId) {
    getMembersList(tableId)
      .then((response) => {
        setMembers(response.data);
      }).catch(error => {
        console.log(error)
      });
    }
  }

  const getProposals = (tableId) => {
    getProposalsPage(tableId)
      .then((response) => {
        setProposals(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const handleMembersDrawerOpen = () => {
    setIsMembersDrawerOpen(true);
  };

  const handleMembersDrawerClose = () => {
    setIsMembersDrawerOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddProposalModalOpen = () => {
    setIsAddProposalModalOpen(true);
  };

  const handleAddProposalModalClose = () => {
    setIsAddProposalModalOpen(false);
  };

  const handleAddOrderModalOpen = () => {
    setIsAddOrderModalOpen(true);
  };

  const handleAddOrderModalClose = () => {
    setIsAddOrderModalOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const onTableClick = (id) => {
    setCurrentTable(id)
  }

  const addProposal = (newProposal) => {
    createNewProposal(newProposal)
      .then(() => {
        getProposals(currentTable);
      }).catch(error => {
        console.log(error)
      })
  }

  const joinTable = (invitation) => {
    joinNewTable(invitation)
      .then(() => {
        getTables();
      }).catch(error => {
        console.log(error)
      })
  }

  const handleGenerateInvitationOpen = () => {
    setIsInviatationPopoverOpen(true);
  }

  const handleGenerateInvitationClose = () => {
    setIsInviatationPopoverOpen(false);
  }

  const handleJoinTableModalOpen = () => {
    setIsJoinTableModalOpen(true);
  }

  const handleJoinTableModalClose = () => {
    setIsJoinTableModalOpen(false);
  }

  const becomePurchaser = (supplierId) => {
    becomePurchaserForSupplier(supplierId, currentTable)
      .then((response) => {
        getProposals(currentTable);
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <div style={{display: "flex", height: '100vh'}} >
      <CssBaseline />
      <Header 
        title={'Stoliki'}
        handleDrawerOpen={handleDrawerOpen} 
        isDrawerOpen={isDrawerOpen} 
        handleAdd={handleAddModalOpen}
        handleJoin={handleGenerateInvitationOpen}
        handlePeople={handleMembersDrawerOpen} 
      />
      <MainViewDrawer handleDrawerClose={handleDrawerClose} open={isDrawerOpen}/>
      <main className={classes.content}>
        <AddTableModal isOpen={isAddModalOpen} handleClose={handleAddModalClose} />
        <JoinTableModal isOpen={isJoinTableModalOpen} handleAccept={joinTable} handleClose={handleJoinTableModalClose} />
        <AddProposalModal isOpen={isAddProposalModalOpen} handleClose={handleAddProposalModalClose} onAddProposal={addProposal} tableId={currentTable} />
        <InvitationPopover isOpen={isInviatationPopoverOpen} handleClose={handleGenerateInvitationClose} tableId={currentTable} />
        <MembersDrawer members={members} isOpen={isMembersDrawerOpen} handleClose={handleMembersDrawerClose} />
        <div className={classes.toolbar} />
        <div style={{display: 'flex'}}>
          <TablesList 
            tables={tables} 
            onTableClick={onTableClick} 
            onAddClick={handleJoinTableModalOpen} 
            currentTableId={currentTable} 
          />
          <div className={classes.right}>
            <div style={{marginLeft: '10%', marginRight: '18%'}}>
              <AppBar position="static" >
                <Tabs value={tab} onChange={handleTabChange} centered>
                  <Tab value={PROPOSALS_TAB} label='Propozycje'/>
                  <Tab value={ORDERS_TAB} label='Zamówienia'/>
                </Tabs>
              </AppBar>
              <div className="scrollbar" style={{marginTop: 10}}>
                <div style={{paddingLeft: 16, marginRight: 10}} >
                  {
                    tab === PROPOSALS_TAB ?
                      <ProposalsList proposals={proposals} members={members} onClick={becomePurchaser} history={history} />
                      : <OrdersList tableId={currentTable} members={members} history={history} />
                  }
                </div>
              </div>  
            </div>
            {
              tab === PROPOSALS_TAB &&
                <AddFAB 
                  onClick={handleAddProposalModalOpen} 
                  tooltip={'Dodaj nową propozycję przy stoliku'}  
                />
            }
          </div>
        </div>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1
  },
  right: {
    width: '100%'
  },
  list: {
    height:'86vh',
    overflowX: 'auto',
    overflow: 'scroll'
  }
}));
