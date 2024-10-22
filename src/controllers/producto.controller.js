const { Producto, Fabricante, Componente } = require('../models');
const controller = {}

// Obtener todos los productos (200)
const getAllProductos = async (req, res) => {
  const productos = await Producto.findAll();
  res.status(200).json(productos);
};

// Obtener un producto por ID (200, 404)
const getProductoById = async (req, res) => {
  const { id } = req.params.id;
  const producto = await Producto.findByPk(id);
  res.status(200).json(producto);
};

// Crear un nuevo producto (201,400)
const createProducto = async (req, res) => {
  const {nombre, descripcon, precio, pathImg} = req.body;
  const nuevoProducto = await Producto.create(
    nombre, descripcon, precio, pathImg
  )
  res.status(201).json(nuevoProducto);
};

// Modificar un producto existente (200,404)
const updateProducto = async (req, res) => {
  const { nombre, descripcion, precio,pathImg } = req.body;
  const id  = req.params.id;
  const producto = await Producto.findByPk(id);
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;
  producto.pathImg = pathImg;
  await Producto.save();
    res.status(200).json(producto);
};

// Borrar un producto (200,404,500)
const deleteProducto = async (req, res) => {
  const  idProducto = req.params.id;
  try {
    const deleted = await Producto.destroy({
      where: { id: idProducto }
    });
    res.status(200).json({ message: `Componente ${deleted} eliminado` });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Asociar un fabricante a un producto (201, 404,400)
const createFabricanteAsociacion = async (req, res) => {
  const id = req.params.id;
  const { fabricantesIds } = req.body; // Se espera que se envíe un array de IDs
  const producto = await Producto.findByPk(id);
  await producto.addFabricante(fabricantesIds);
  res.status(201).json({ message: 'Fabricantes asociados al producto' });
  
};
// Obtener todos los fabricantes de un producto (200,404)
const getFabricantesDeProducto = async (req, res) => {
  const id  = req.params.id;
  
  const producto = await Producto.findByPk(id, {
  include: [{ model: Fabricante, as: 'manufacturers' }]
    });
  res.status(200).json(producto);
};

// Asociar un componente a un producto (201,404,400)
const createComponenteAsociacion = async (req, res) => {
  const  id  = req.params.id;
  const { componentesIds } = req.body; // Se espera que se envíe un array de IDs
  const producto = await Producto.findByPk(id);
  await producto.addComponente(componentesIds);
  res.status(201).json({ message: 'Componentes asociados al producto' });
};

// Obtener todos los componentes de un producto (200,404)
const getComponentesDeProducto = async (req, res) => {
  const id  = req.params.id;
  const producto = await Producto.findByPk(id, {
    include: [{ model: Componente, as: 'components' }]
  });
  if (producto) {
    res.status(200).json(producto);
  }
};


controller.getAllProductos = getAllProductos
controller.getProductoById = getProductoById
controller.createProducto = createProducto
controller.updateProducto = updateProducto
controller.deleteProducto = deleteProducto
controller.createFabricanteAsociacion = createFabricanteAsociacion
controller.getFabricantesDeProducto = getFabricantesDeProducto
controller.createComponenteAsociacion = createComponenteAsociacion
controller.getComponentesDeProducto = getComponentesDeProducto

module.exports= controller