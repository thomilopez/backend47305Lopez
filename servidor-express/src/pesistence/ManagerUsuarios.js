const fs = require('fs').promises;

class ManagerUsuarios {
  constructor() {
    this.path = 'package.json';
  }

  async crearUsuario(usuario) {
    try {
      const data = await fs.readFile(this.path);
      const packageData = JSON.parse(data);

      if (!packageData.usuarios) {
        packageData.usuarios = [];
      }

      packageData.usuarios.push(usuario);

      await fs.writeFile(this.path, JSON.stringify(packageData, null, 2));
      console.log('Usuario creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }

  async consultarUsuarios() {
    try {
      const data = await fs.readFile(this.path);
      const packageData = JSON.parse(data);
      const usuarios = packageData.usuarios || [];

      console.log('Usuarios:', usuarios);
    } catch (error) {
      console.error('Error al consultar los usuarios:', error);
    }
  }
}

module.exports = ManagerUsuarios;