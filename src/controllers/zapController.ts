import { Response } from 'express';
import { Zap } from '../models/Zap';
import { AuthRequest } from '../models/AuthRquest';

export const getZaps = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const zaps = await Zap.find({ userId });
    res.json(zaps);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los Zaps' });
  }
};

export const createZap = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const newZap = new Zap({
      ...req.body,
      userId
    });
    const savedZap = await newZap.save();
    res.status(201).json(savedZap);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Zap' });
  }
};

export const updateZap = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const updatedZap = await Zap.findOneAndUpdate(
      { _id: req.params.id, userId }, 
      req.body,
      { new: true }
    );
    
    if (!updatedZap) {
      return res.status(404).json({ error: 'Zap no encontrado o sin permisos' });
    }
    res.json(updatedZap);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el Zap' });
  }
};