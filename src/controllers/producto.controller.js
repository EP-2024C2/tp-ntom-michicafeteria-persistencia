const { Producto, Fabricante, Componente } = require('../models');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error });
  }
};

// Modificar un producto existente
exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Producto.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedProducto = await Producto.findByPk(id);
      res.status(200).json(updatedProducto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto', error });
  }
};

// Borrar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Producto.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Asociar un fabricante a un producto
exports.createFabricanteAsociacion = async (req, res) => {
  const { id } = req.params;
  const { fabricantesIds } = req.body; // Se espera que se envíe un array de IDs
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.addFabricante(fabricantesIds);
    res.status(201).json({ message: 'Fabricantes asociados al producto' });
  } catch (error) {
    res.status(400).json({ message: 'Error al asociar fabricantes', error });
  }
};

// Obtener todos los fabricantes de un producto
exports.getFabricantesDeProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id, {
      include: [{ model: Fabricante, as: 'manufacturers' }]
    });
    if (producto) {
      res.status(200).json(producto.manufacturers);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener fabricantes del producto', error });
  }
};

// Asociar un componente a un producto
exports.createComponenteAsociacion = async (req, res) => {
  const { id } = req.params;
  const { componentesIds } = req.body; // Se espera que se envíe un array de IDs
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.addComponente(componentesIds);
    res.status(201).json({ message: 'Componentes asociados al producto' });
  } catch (error) {
    res.status(400).json({ message: 'Error al asociar componentes', error });
  }
};

// Obtener todos los componentes de un producto
exports.getComponentesDeProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id, {
      include: [{ model: Componente, as: 'components' }]
    });
    if (producto) {
      res.status(200).json(producto.components);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener componentes del producto', error });
  }
};
