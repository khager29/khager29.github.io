import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);
    newContact
        .save()
        .then(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const getContacts = (req, res) => {
    Contact.find()
        .then(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId)
        .then(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, {
        new: true,
    })
        .then(function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const deleteContact = (req, res) => {
    Contact.findOneAndDelete({ _id: req.params.contactId })
        .then(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted contact." });
        })
        .catch(function (err) {
            console.log(err);
        });
};
