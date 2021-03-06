import React from 'react';
import { Card, Modal, Button, Flex } from 'rimble-ui';
import PropTypes, { InferProps } from 'prop-types';
import TopUp from './actions/TopUp';
import Withdraw from './actions/Withdraw';
import AddAsset from './actions/AddAsset';
import { AssetAction } from '../../../utils/types';
import { CopyTrader } from '../../../typechain';

const ContractPoolsTableModal = ({
    isOpen,
    curAction,
    closeModal,
    contract,
}: InferProps<typeof props>): JSX.Element => {
    const handleClose = (e: React.SyntheticEvent) => {
        e.preventDefault();
        closeModal();
    };

    const renderCurAction = (curAction: AssetAction, contract: CopyTrader) => {
        switch (curAction.actionName) {
            case 'Top up':
                return (
                    <TopUp
                        curAction={curAction}
                        contract={contract}
                        closeModal={handleClose}
                    />
                );
            case 'Withdraw':
                return <Withdraw curAction={curAction} contract={contract} />;
            case 'Add asset':
                return <AddAsset curAction={curAction} contract={contract} />;
            default:
                console.error(curAction);
                throw new Error('Unsupported action');
        }
    };

    return (
        <Modal isOpen={isOpen}>
            <Card width={'auto'} p={0}>
                <Button.Text
                    icononly
                    icon={'Close'}
                    color={'moon-gray'}
                    position={'absolute'}
                    top={0}
                    right={0}
                    mt={3}
                    mr={3}
                    onClick={handleClose}
                />
                {curAction
                    ? renderCurAction(
                          curAction as AssetAction,
                          contract as CopyTrader,
                      )
                    : null}
                <Flex
                    px={4}
                    py={3}
                    borderTop={1}
                    borderColor={'#E8E8E8'}
                    justifyContent={'flex-end'}
                >
                    <Button.Outline onClick={closeModal}>Cancel</Button.Outline>
                </Flex>
            </Card>
        </Modal>
    );
};

const props = {
    isOpen: PropTypes.bool.isRequired,
    curAction: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    contract: PropTypes.object.isRequired,
};

export default ContractPoolsTableModal;
