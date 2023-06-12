package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;

public interface IDataTransferObjectManager<T> {
    IDataTransferObject<T> getDTO(T object);

    T createFromDTO(IDataTransferObject<T> dto);

    T updateFromDTO(T object, IDataTransferObject<T> dto);
}
