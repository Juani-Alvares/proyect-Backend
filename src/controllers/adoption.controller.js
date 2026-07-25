import adoptionService from "../services/adoption.service.js";

export const getAdoptions = async (req, res) => {
    try {
        const result = await adoptionService.getAll();

        res.send({
            status: "success",
            payload: result
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }
};

export const getAdoptionById = async (req, res) => {

    try {

        const result = await adoptionService.getById(req.params.id);

        if (!result) {

            return res.status(404).send({
                status: "error",
                message: "Adoption not found"
            });

        }

        res.send({
            status: "success",
            payload: result
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

};

export const createAdoption = async (req, res) => {

    try {

        const result = await adoptionService.create(req.body);

        res.status(201).send({
            status: "success",
            payload: result
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

};

export const updateAdoption = async (req, res) => {

    try {

        const result = await adoptionService.update(
            req.params.id,
            req.body
        );

        res.send({
            status: "success",
            payload: result
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

};

export const deleteAdoption = async (req, res) => {

    try {

        await adoptionService.delete(req.params.id);

        res.send({
            status: "success",
            message: "Adoption deleted"
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

};