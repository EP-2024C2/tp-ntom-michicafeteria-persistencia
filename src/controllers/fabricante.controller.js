const { Fabricante, Producto } = require('../models');

// Obtener todos los fabricantes
exports.getAllFabricantes = async (req, res) => {
  try {
    const fabricantes = await Fabricante.findAll();
    res.status(200).json(fabricantes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener fabricantes', error });
  }
};

// Obtener un fabricante por ID
exports.getFabricanteById = async (req, res) => {
  const { id } = req.params;
  try {
    const fabricante = await Fabricante.findByPk(id);
    if (fabricante) {
      res.status(200).json(fabricante);
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el fabricante', error });
  }
};

// Crear un nuevo fabricante
exports.createFabricante = async (req, res) => {
  try {
    const nuevoFabricante = await Fabricante.create(req.body);
    res.status(201).json(nuevoFabricante);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el fabricante', error });
  }
};

// Modificar un fabricante existente
exports.updateFabricante = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Fabricante.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedFabricante = await Fabricante.findByPk(id);
      res.status(200).json(updatedFabricante);
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el fabricante', error });
  }
};

// Borrar un fabricante
exports.deleteFabricante = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Fabricante.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Fabricante eliminado' });
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el fabricante', error });
  }
};

// Obtener todos los productos de un fabricante
exports.getProductosDeFabricante = async (req, res) => {
  const { id } = req.params;
  try {
    const fabricante = await Fabricante.findByPk(id, {
      include: [{ model: Producto, as: 'manyProducts' }]
    });
    if (fabricante) {
      res.status(200).json(fabricante.manyProducts);
    } else {
      res.status(404).json({ message: 'Fabricante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos del fabricante', error });
  }
};
