import numpy as np

np_load_old = np.load
np.load = lambda *a,**k: np_load_old(*a, allow_pickle=True, **k)
with np.load('simplified-recipes-1M.npz') as data:
    recipes = data['recipes']
    ingredients = data['ingredients']
print(len(ingredients))