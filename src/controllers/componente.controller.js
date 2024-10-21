const { Componente, Producto } = require('../models');
const controller = {}

// Obtener todos los componentes (200)
const getAllComponentes = async (req, res) => {
  const componentes = await Componente.findAll();
  res.status(200).json(componentes);
};

// Obtener un componente por ID (200,404)
const getComponenteById = async (req, res) => {
  const { id } = req.params;
  const componente = await Componente.findByPk(id);
  if (componente)
    res.status(200).json(componente);
};

// Crear un nuevo componente (201,400)
const createComponente = async (req, res) => {
  const nuevoComponente = await Componente.create(req.body);
  res.status(201).json(nuevoComponente);
};

// Modificar un componente existente (200,404)
const updateComponente = async (req, res) => {
  const { id } = req.params;
  const [updated] = await Componente.update(req.body, {
    where: { id }
  });
  if (updated) {
    const updatedComponente = await Componente.findByPk(id);
    res.status(200).json(updatedComponente);
  }
};

// Borrar un componente (200,404,500)
const deleteComponente = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Componente.destroy({
      where: { id }
    });
    if (deleted) 
      res.status(200).json({ message: 'Componente eliminado' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el componente', error });
  }
};

// Obtener todos los productos de un componente (200,404)
const getProductosDeComponente = async (req, res) => {
  const { id } = req.params;
  const componente = await Componente.findByPk(id, {
    include: [{ model: Producto, as: 'productos' }]
  });
  if (componente) 
    res.status(200).json(componente.productos);
  
  
};

controller.getAllComponentes = getAllComponentes
controller.getComponenteById = getComponenteById
controller.createComponente = createComponente
controller.updateComponente = updateComponente
controller.deleteComponente  = deleteComponente
controller.getProductosDeComponente = getProductosDeComponente

module.exports= controller