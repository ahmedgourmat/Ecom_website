const Command = require('../models/Command')
const User = require('../models/User')

const createCommand = async(req , res)=>{

    const userId = req.user

    const { products , delivery } = req.body

    try {

        await Command.create({userId , products , delivery })
        
        res.status(201).json({message : 'Command created successfully'})

    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const confirmCommand = async (req, res) => {
    const { commandId } = req.params; 

    try {
        
        let command = await Command.findById(commandId)
            .populate('products.product', 'price') 
            .populate('user', '-password'); 

        if (!command) {
            return res.status(404).json({ message: '404 Not found' });
        }

        let totalPrice = 0;
        command.products.forEach(item => {
            const productPrice = item.product.promo ? item.product.promoPrice : item.product.price;
            totalPrice += productPrice * item.quantity;
        });

        totalPrice += command.delivery; 


        command.totalPrice = totalPrice;
        command.confirm = true;
        await command.save(); 

        res.status(200).json({
            message: 'Command confirmed successfully',
            totalPrice: command.totalPrice
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getCommands = async(req , res)=>{

    const { email } = req.query

    let user = {}

    try {
        
        if(email){
            user = await User.find({email}).select('_id').lean()
        }

        let commands = await Command.find(user)
        .populate('products.product')
        .populate('user' , '-password')

        commands = await Categorie.populate(commands ,{
            path : 'products.product.categorie',
            select : 'name',
        })


        if(!commands){
            res.status(404).json({message : '404 Not found'})
        }

        res.status(200).json(commands)

    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const updateCommand = async (req, res) => {
    const { commandId } = req.params; // The ID of the command to update
    const { products } = req.body; // The updated products array

    try {
        // Find the command by ID
        let command = await Command.findById(commandId);

        if (!command) {
            return res.status(404).json({ message: 'Command not found' });
        }

        // Update the command's products array
        products.forEach(updatedProduct => {
            const index = command.products.findIndex(
                p => p.product.toString() === updatedProduct.product
            );

            if (index !== -1) {
                // Update existing product's details
                command.products[index].quantity = updatedProduct.quantity || command.products[index].quantity;
                command.products[index].color = updatedProduct.color || command.products[index].color;
                command.products[index].size = updatedProduct.size || command.products[index].size;
                command.products[index].product = updatedProduct.product || command.products[index].product;
            } else {
                // If the product doesn't exist in the current list, add it
                command.products.push(updatedProduct);
            }
        });

        // Save the updated command
        await command.save();

        res.status(200).json({
            message: 'Command updated successfully',
            command,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteCommand = async(req , res)=>{

    const commandId = req.params

    try {
        
        const data = await Command.findById(commandId)
        data.retour = true

        data.save()

        res.status(200).json({message : 'Command deleted seccussfully'})

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}



module.exports = {
    createCommand , 
    confirmCommand ,
    getCommands ,
    updateCommand ,
    deleteCommand
}   