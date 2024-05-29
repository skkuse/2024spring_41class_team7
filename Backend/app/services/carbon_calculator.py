<<<<<<< HEAD
def calculate_carbon_emission(t: float, nc: int, nm: int, uc: float, Pc: float, Pm: float, PUE: float) -> float:
    """
    Calculate the carbon emission based on the given parameters.
    E = t × (nc × Pc × uc + nm × Pm) × PUE × 0.001
    """
    E = t * (nc * Pc * uc + nm * Pm) * PUE * 0.001
=======
def calculate_carbon_emission(t: float, cores: int, memory: int, uc: float, Pc: float, Pm: float, PUE: float) -> float:
    """
    Calculate the carbon emission based on the given parameters.
    E = t x (nc x Pc x uc + nm x Pm) x PUE x 0.001
    """
    E = t * (cores * Pc * uc + memory * Pm) * PUE * 0.001
>>>>>>> b5f2d9130d8143d5d4b9ed685ec013a43780fb62
    return E
