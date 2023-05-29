package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.LocationDTO;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.services.LocationService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationController extends AbstractController implements ch.heig.pdg.backend.api.LocationApi {
    private final LocationService locationService;
    public LocationController(HttpServletRequest httpServletRequest, LocationService locationService) {
        super(httpServletRequest);
        this.locationService = locationService;
    }

    @Override
    public ResponseEntity<LocationDTO> createLocation(Integer inventoryId, LocationDTO locationDTO) {
        return new ResponseEntity<>(
                this.locationService.addLocation(inventoryId, locationDTO),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<LocationDTO> deleteLocation(Integer id) {
        return new ResponseEntity<>(
                this.locationService.removeLocation(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<LocationDTO> getLocation(Integer id) {
        return new ResponseEntity<>(
                this.locationService.getLocation(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<List<LocationDTO>> getLocations(Integer inventoryId) {
        HugoSearchFilter<Location> filter = HugoSearchFilter.build(this.httpServletRequest);

        return new ResponseEntity<>(
                this.locationService.getLocations(inventoryId, filter),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<LocationDTO> updateLocation(Integer id, LocationDTO locationDTO) {
        return new ResponseEntity<>(
                this.locationService.updateLocation(id, locationDTO),
                HttpStatus.OK
        );
    }
}
