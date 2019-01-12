const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const WalletModel = require('./../models/Wallet');
const { filter } = require('lodash');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
fs = require('fs'),
path = require('path');


const CsvController = () => {

    getFile = async (req, res) => {
        
        const csvWriter = createCsvWriter({
            path: 'db/files/file.csv',
            header: [
                { id: 'name', title: 'name' },
                { id: 'currentState', title: 'currentState' }
            ]
        });

        try {
            const { userId } = req.body;
            const current = await WalletModel.findOne({ where: { UserId: 1 } }).then(async (curr) => {

                const data =[ {
                        name: curr.name,
                        currentState : curr.currentState
                }]
                
                await csvWriter.writeRecords(data);
                   
            });
            
            const filePath = 'db/files/file.csv';
            res.setHeader("Content-Type","text/csv");
            res.download(filePath,'file.csv');
            
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
        getFile,
    }
}


module.exports = CsvController;