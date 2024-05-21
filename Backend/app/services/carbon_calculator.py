def calculate_carbon_emission(t: float, cores: int, memory: int, uc: float, Pc: float, Pm: float, PUE: float) -> float:
    """
    Calculate the carbon emission based on the given parameters.
    E = t × (nc × Pc × uc + nm × Pm) × PUE × 0.001
    """
    E = t * (cores * Pc * uc + memory * Pm) * PUE * 0.001
    return E
