const { Componente, Producto } = require('../models');

// Obtener todos los componentes
exports.getAllComponentes = async (req, res) => {
  try {
    const componentes = await Componente.findAll();
    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener componentes', error });
  }
};

// Obtener un componente por ID
exports.getComponenteById = async (req, res) => {
  const { id } = req.params;
  try {
    const componente = await Componente.findByPk(id);
    if (componente) {
      res.status(200).json(componente);
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el componente', error });
  }
};

// Crear un nuevo componente
exports.createComponente = async (req, res) => {
  try {
    const nuevoComponente = await Componente.create(req.body);
    res.status(201).json(nuevoComponente);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el componente', error });
  }
};

// Modificar un componente existente
exports.updateComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Componente.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedComponente = await Componente.findByPk(id);
      res.status(200).json(updatedComponente);
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el componente', error });
  }
};

// Borrar un componente
exports.deleteComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Componente.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Componente eliminado' });
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el componente', error });
  }
};

// Obtener todos los productos de un componente
exports.getProductosDeComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const componente = await Componente.findByPk(id, {
      include: [{ model: Producto, as: 'productos' }]
    });
    if (componente) {
      res.status(200).json(componente.productos);
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos del componente', error });
  }
};
